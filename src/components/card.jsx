export default function Card({ doctor }) {
    return (
      <div className="bg-white w-[650px] shadow-md hover:shadow-lg transition-all p-5 rounded-lg relative">
        <div className="flex">
          <div className="w-2/5 p-5 text-center">
            <img className="max-h-60 mx-auto" src={doctor.image } alt={doctor.image} />
          </div>
          <div className="w-3/5 p-5 border-l-2 border-gray-200">
            <h2 className="text-lg font-semibold uppercase text-gray-700">{doctor.fullname}</h2>
            <h4 className="text-xs uppercase text-gray-500">{doctor.specialization}</h4>
            <h4 className="text-xs uppercase text-gray-500">{doctor.experience} years experience</h4>
            <h1 className="text-2xl font-light text-gray-700 pt-4">Rs.{doctor.fees}</h1>
            <p className="text-xs text-gray-500 pt-4">{doctor.description}</p>
            <div className="mt-5">
              <button className="border border-gray-300 text-gray-700 uppercase text-xs px-5 py-2 mr-2 transition-all hover:border-green-400 hover:text-green-400">Add to Cart</button>
              <button className="border border-gray-300 text-gray-700 uppercase text-xs px-5 py-2 transition-all hover:border-green-400 hover:text-green-400">Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  