import bgimg from "/src/assets/banner-image-bg-1.jpg";
import bookImg from "/src/assets/banner-image3.png";
import DiscountTimer from "/src/components/Home/Discount/DiscountTimer.jsx";

const DiscountSection = () => {
  return (
    <section
      className="w-full h-[600px] bg-cover bg-center flex justify-center items-center px-4 md:px-8"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="container flex flex-col w-full md:flex-row items-center justify-between">
        {/*Left Content*/}
        <div className="max-w-md md:w-1/2 flex justify-center">
          <img src={bookImg} alt="" className="w-2/3 md:w-full" />
        </div>

        {/*Right Content*/}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            30% Discount On All Items. Hurry Up!!!
          </h1>
          {/*Countdoun Timer*/}
          <DiscountTimer />

          <button className="btn btn-secondary px-6 py-3 rounded-full shadow-md">
            Shop Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
