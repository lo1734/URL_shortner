function TableSkeleton() {

  return (

    <div
      className="
        animate-pulse
        bg-white
        rounded-2xl
        border
        p-6
      "
    >

      <div
        className="
          h-6
          bg-gray-200
          rounded
          mb-6
        "
      />

      {[...Array(5)].map(
        (_, index) => (

          <div
            key={index}
            className="
              h-14
              bg-gray-100
              rounded
              mb-4
            "
          />
        )
      )}

    </div>
  );
}

export default TableSkeleton;