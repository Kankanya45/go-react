import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <Header /> {/* Render Header component */}
      <div className="container mx-auto px-4">
        {/* Content section */}
        <div className="py-8">
          <h1 className="text-3xl font-semibold mb-4">Welcome to My App!</h1>
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            ornare libero ac arcu sodales faucibus. Duis ultricies tincidunt
            velit, id consequat nisi lobortis at. Aliquam erat volutpat. Morbi
            quis lectus sit amet velit sollicitudin tempor.
          </p>
          <p className="text-lg">
            Integer vitae lorem eu nibh fermentum consectetur. Curabitur
            consectetur, libero sit amet lacinia molestie, turpis lacus
            molestie tellus, a bibendum ex odio non velit. Proin et felis non
            nulla scelerisque volutpat.
          </p>
        </div>
      </div>
      <Footer /> {/* Render Footer component */}
    </div>
  );
};

export default Home;
