const FoodMenu = () => {
  const items = [
    {
      id: "item_salad",
      title: "Farmstand Salad",
      price: "$9",
      image:
        "https://assets.codepen.io/652/photo-1468777675496-5782faaea55b.jpeg",
      description:
        "Dig into the freshest veggies of the season! This salad-in-a-jar features a mixture of leafy greens and seasonal vegetables, fresh from the farmer's market.",
      extra:
        "Served with your choice of dressing on the side: housemade ranch, cherry balsamic vinaigrette, creamy chipotle, avocado green goddess, or honey mustard. Add your choice of protein for $2 more."
    },
    {
      id: "item_reuben",
      title: "Ultimate Reuben",
      price: "$18",
      image:
        "https://assets.codepen.io/652/photo-1520174691701-bc555a3404ca.jpeg",
      description:
        "All great meals take time, but this one takes it to the next level! More than 650 hours of fermenting, brining, aging, and curing goes into each and every one of our legendary Reuben sandwiches.",
      extra:
        "Every element of this extraordinary sandwich is handcrafted in our kitchens, from the rye bread baked from our secret recipe to the cave-aged Swiss cheese, right down to the pickle."
    },
    {
      id: "item_fig",
      title: "Fig & Berry Plate",
      price: "$16",
      image:
        "https://assets.codepen.io/652/photo-1544510808-91bcbee1df55.jpeg",
      description:
        "A succulent sextet of fresh figs join with a selection of bodacious seasonal berries in this refreshing, shareable dessert.",
      extra:
        "Choose your drizzle: cherry-balsamic vinegar, local honey, or housemade chocolate sauce.",
      seasonal: true
    }
  ];

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen py-10">
      <ul className="flex flex-wrap justify-center gap-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-80"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
              />
              <div className="absolute top-2 right-2 text-white text-xl font-bold bg-black bg-opacity-50 px-3 py-1 rounded">
                {item.price}
              </div>
              {item.seasonal && (
                <div className="absolute top-2 left-2 text-yellow-300 text-sm font-semibold bg-black bg-opacity-50 px-3 py-1 rounded">
                  Seasonal
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-white text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-300 text-sm mb-2">{item.description}</p>
              <p className="text-gray-400 text-xs">{item.extra}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodMenu;
