import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router

const MessageImportance = () => {
  return (
    <>
      

      {/* Main Content */}
      <div className="container py-5">
        <h1 className="text-center text-primary mb-5" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          The Power of Messages in Communication
        </h1>

        {/* First Section */}
        <div className="row align-items-center justify-content-center mb-5">
          <div className="col-md-6 mb-3 mb-md-0 d-flex justify-content-center">
            <img
              src="https://img.freepik.com/free-vector/men-talking-concept-illustration_114360-8882.jpg?t=st=1744523861~exp=1744527461~hmac=497cedd9b9a3b4459f8dea3c15350ffa238ed14d98ee2acf93051e69ce3f005d&w=740"
              alt="Chat Illustration"
              className="img-fluid"
              style={{
                maxWidth: '60%',
                height: 'auto',
                borderRadius: '10px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>
          <div className="col-md-6">
            <p className="fs-4 text-center text-muted">
              Messages are the heartbeat of communication. Whether brief or long, they carry our feelings, thoughts, and ideas—allowing us to connect and understand one another more deeply.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="row align-items-center justify-content-center mb-5 flex-md-row-reverse">
          <div className="col-md-6 mb-3 mb-md-0 d-flex justify-content-center">
            <img
              src="https://img.freepik.com/free-vector/group-people-teamwork-with-speech-bubble_24877-56205.jpg?t=st=1744524075~exp=1744527675~hmac=d67079c4cad98eab0d9ab172cdf29876e53541d4f87e604a51a875fe1ac68ddc&w=740"
              alt="Digital Communication"
              className="img-fluid"
              style={{
                maxWidth: '60%',
                height: '60%',
                borderRadius: '10px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>
          <div className="col-md-6">
            <p className="fs-4 text-center text-muted">
              In a fast-paced digital world, instant messages make communication seamless and meaningful. They break barriers and make distant conversations feel close.
            </p>
          </div>
        </div>

        {/* Card for Why Messages Matter */}
        <div className="card bg-light shadow-lg mb-5 border-0">
          <div className="card-body p-4">
            <h4 className="card-title text-primary mb-4 text-center" style={{ fontSize: '2rem' }}>
              Why Messages Matter
            </h4>
            <ul className="fs-5 text-muted">
              <li>They build and maintain relationships</li>
              <li>They express emotions and intentions clearly</li>
              <li>They enable teamwork and coordination</li>
              <li>They reduce confusion and strengthen clarity</li>
            </ul>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center mt-5">
          <Link to="/home">
            <button className="btn btn-primary btn-lg px-5 py-3" style={{ fontSize: '1.2rem' }}>
              Start Chatting Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MessageImportance;
