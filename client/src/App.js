import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header"
import Particles from 'react-particles-js';
import Footer from "./components/Footer";
import Gallery from './components/Gallery'

function App() {
  return (
    <>
      <Particles
        params={{
          particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 1000
              }
            },
            opacity: {
              value: 1,
              random: true,
              anim: {
                encable: true,
                speed: 0.2,
                opacity_min: 0,
                sync: false
              }
            },
            size: {
              value: 10,
              random: true,
              anim: {
                encable: true,
                speed: 2,
                opacity_min: 5,
                sync: false
              }
            },
            line_linked: {
              enable: false,
              distance: 150,
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: .5,
              direction: "top",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }

          }
        }}
      />
      <Navbar />
      <Header />
      <Gallery />
      <Footer />
    </>
  );
}

export default App;
