const Spinner = () => (
  <div className="relative inline-flex w-4 h-4">
    <div className="absolute w-full h-full border-2 border-t-transparent border-current rounded-full animate-spin" />
    <div className="absolute w-full h-full border-2 border-t-transparent border-current rounded-full animate-ping opacity-20" />
  </div>
);

export default Spinner;
