function Loading() {
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-15 h-15 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
export default Loading;
