function RestaurantFooter() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start   justify-between px-5 py-5">
      <div className="text-2xl">About us</div>
        <div className="mt-20">
                <header>Contacts Us</header>
                <ol className="flex flex-col gap-2 mt-5 underline">
                    <li>instagram</li>
                    <li>facebook</li>
                    <li>twitter</li>
                </ol>
        </div>
      <div className="mt-20">deliver from love </div>
    </div>
  );
}

export default RestaurantFooter;
