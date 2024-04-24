
function ErrorAccess() {
  return (
    <div>
      {document.body.innerHTML = 'Bạn không thể truy cập trang này'}
    </div>
  );
}

export default ErrorAccess;
