const Home = (props) => {
  return (
    <div>
      <h1>
        {props.name
          ? props.name + " ma wielkiego kutonga"
          : "ZALOGUJ SIE WARIACIE"}
      </h1>
    </div>
  );
};

export default Home;
