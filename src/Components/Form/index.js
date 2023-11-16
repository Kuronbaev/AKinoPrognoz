const Form = ({ data }) => {
  return (
    <>
      <div className="  text-white flex items-center justify-center gap-2 mt-3">
        <h1>{data.name}</h1>
        <h2>{data.sys?.country}</h2>
      </div>
      <div className=" flex text-white items-center justify-center flex-row gap-2">
        <h1>Температура:{data.main?.temp}</h1>
      </div>
      <h3 className="text-white">Погода:{data.weather?.map((el) => el.description)}</h3>
      <h4 className=" text-white">Скорость ветра:{data.wind?.speed}</h4>
      {data.weather?.map((el) => (
        <img
          className=" w-[200px]"
          src={`http://openweathermap.org/img/w/${el.icon}.png`}
          alt=""
        />
      ))}
    </>
  );
};

export default Form;
