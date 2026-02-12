import { useState } from 'react';
import './App.css';
import MemoContainer from './components/MemoContainer';
import SideBar from './components/SideBar';

function App() {
  const [memos, setMemos] = useState([
    {
      title: 'Memo 1',
      content: 'This is memo 1',
      createdAt: 1770733338339, // 시간 값
      updatedAt: 1770733338339, // 시간 값
    },
    {
      title: 'Memo 2',
      content: 'This is memo 2',
      createdAt: 1770733364798, // 시간 값
      updatedAt: 1770733364798, // 시간 값
    },
  ]);

  const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

  const setMemo = (newMemo) => {
    // 불변성 어긴 코드
    // memos[selectedMemoIndex] = newMemo;
    // 1) reference 안의 리렌더링 X
    // setMemos(memos);
    // 2) 객체 업데이트 판단 -> 리렌더링 O
    // setMemos([...memos]);

    // 불변성 유지
    const newMemos = [...memos];
    newMemos[selectedMemoIndex] = newMemo;
    setMemos(newMemos);
  };

  return (
    <div className="App">
      <SideBar
        memos={memos}
        selectedMemoIndex={selectedMemoIndex}
        setSelectedMemoIndex={setSelectedMemoIndex}
      />
      <MemoContainer memo={memos[selectedMemoIndex]} setMemo={setMemo} />
    </div>
  );
}

export default App;
