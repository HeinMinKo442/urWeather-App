function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 border border-red-400 rounded-md shadow-sm max-w-md text-center">
      <p className="text-sm font-medium">{error}</p>
    </div>
  );
}
export default ErrorMessage;
