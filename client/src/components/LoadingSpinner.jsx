function LoadingSpinner() {

  return (

    <div
      className="
        flex
        items-center
        justify-center
        py-20
      "
    >

      <div
        className="
          animate-spin
          rounded-full
          h-10
          w-10
          border-b-2
          border-black
        "
      />

    </div>
  );
}

export default LoadingSpinner;