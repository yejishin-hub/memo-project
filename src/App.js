import { useCallback, useState } from 'react';
import './App.css';
import MemoContainer from './components/MemoContainer';
import SideBar from './components/SideBar';
import { getItem, setItem } from './lib/storage';
import debounce from 'lodash.debounce';

// setItem이 1번 이상 호출될 때, 마지막 호출로부터 5초가 지나면 setItem을 실행한다.
const debouncedSetItem = debounce(setItem, 5000);

function App() {
  const [memos, setMemos] = useState(getItem('memo') || []);

  const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

  const setMemo = useCallback(
    (newMemo) => {
      // 불변성 어긴 코드
      // memos[selectedMemoIndex] = newMemo;
      // 1) reference 안의 리렌더링 X
      // setMemos(memos);
      // 2) 객체 업데이트 판단 -> 리렌더링 O
      // setMemos([...memos]);

      // 불변성 유지
      // const newMemos = [...memos];
      // newMemos[selectedMemoIndex] = newMemo;
      // setMemos(newMemos);
      // state : memos
      setMemos((memos) => {
        const newMemos = [...memos];
        newMemos[selectedMemoIndex] = newMemo;
        debouncedSetItem('memo', newMemos);
        return newMemos;
      });
    },
    [/*memos,*/ selectedMemoIndex], // memos와 selectedMemoIndex가 바뀌는 경우 setMemo 재생성
  );

  const addMemo = useCallback(() => {
    // setMemos(newMemos);
    setMemos((memos) => {
      const now = new Date().getTime();
      const newMemos = [
        ...memos,
        {
          title: 'Untitled',
          content: '',
          createdAt: now,
          updatedAt: now,
        },
      ];
      debouncedSetItem('memo', newMemos);
      return newMemos;
    });
    setSelectedMemoIndex(memos.length); // 추가한 메모 선택
  }, [memos]);

  const deleteMemo = useCallback(
    (index) => {
      // setMemos(newMemos);
      setMemos((memos) => {
        const newMemos = [...memos];
        newMemos.splice(index, 1);
        debouncedSetItem('memo', newMemos);
        return newMemos;
      });
      if (index === selectedMemoIndex) {
        setSelectedMemoIndex(0);
      }
    },
    // React Hook useCallback has an unnecessary dependency: 'memos'. Either exclude it or remove the dependency array
    [/*memos,*/ selectedMemoIndex],
  );

  return (
    <div className="App">
      <SideBar
        memos={memos}
        deleteMemo={deleteMemo}
        addMemo={addMemo}
        selectedMemoIndex={selectedMemoIndex}
        setSelectedMemoIndex={setSelectedMemoIndex}
      />
      <MemoContainer memo={memos[selectedMemoIndex]} setMemo={setMemo} />
    </div>
  );
}

export default App;
