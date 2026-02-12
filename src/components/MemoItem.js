function MemoItem({ children, onclick, isSelected }) {
  return (
    <div
      className={'MemoItem' + (isSelected ? ' selected' : '')}
      onClick={onclick}
    >
      {children}
    </div>
  );
}

export default MemoItem;
