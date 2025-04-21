import bgimg from "/src/assets/banner-image-bg.jpg";

const CarouselSlide = ({ title, subtitle, image }) => {
  return (
    <section
      className="w-full h-[650px] bg-cover bg-center flex justify-center items-center px-4 md:px-8"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="flex flex-col w-full md:flex-row items-center justify-between max-w-6xl px-4 md:px-8">
        {/*Left Content*/}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="text-gray-600 my-4">{subtitle}</p>
          <button className="btn btn-secondary px-6 py-3 rounded-full shadow-md">
            Shop Product
          </button>
        </div>

        {/*Right Content*/}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={image}
            alt=""
            className="max-w-full md:max-w-md drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default CarouselSlide;

/*
------ RESPONSIVE -------

1. w-full md:w-1/2 --> both child div
2. flex flex-col md:flex-row --> parent div 
3. px-4 md:px-8 --> section 
4. text-4xl md:text-5xl --> h1
5. text-center md:text-left --> parent div 
6. max-w-full md:max-w-md --> img 
7. mb-8 md:mb-0 --> first child 
8. w-full px-4 md:px-8 --> parent
*/
