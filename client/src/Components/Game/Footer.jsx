const Footer = () => {
  return (
    <section className="section">
      <div className="container">
        <div
          className="video"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <iframe
            width="560"
            height="315"
            title="blockchain"
            src="https://www.youtube.com/embed/videoseries?list=UUOKAdrQ0sKR9H1hi88RmQkA "
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default Footer;
