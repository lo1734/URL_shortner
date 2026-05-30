function EmptyState(){
    return (

    <div
      className="
        bg-white
        border
        rounded-2xl
        p-12
        text-center
      "
    >

      <h2
        className="
          text-2xl
          font-semibold
          mb-4
        "
      >
        No URLs Yet
      </h2>

      <p className="text-gray-500">
        Create your first shortened URL.
      </p>

    </div>
  );
}
export default EmptyState;