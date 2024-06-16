import  { useState, useEffect } from "react";
import Logo from "../../assets/output-onlinegiftools.gif";
import dashboardicon from "../../assets/output-onlinegiftools (1).gif";
import tasksicon from "../../assets/output-onlinegiftools (2).gif";
import reviewicon from "../../assets/output-onlinegiftools (3).gif";
import presicon from "../../assets/output-onlinegiftools (4).gif";
import boardicon from "../../assets/output-onlinegiftools (99).gif";
import reporticon from "../../assets/output-onlinegiftools (n).gif";
import logouticon from "../../assets/output-onlinegiftools (ll).gif";
import { motion } from "framer-motion";
import RightArrowIcon from "../../assets/arrow-right (1).png";
import '../../styles.css'; 
import { Link } from "react-router-dom";


const variants = {
  // todo: change expanded to 30% and nonexpanded to %6
  expanded: { width: "220px" },
  nonexpanded: { width: "60px" },
};

const navLinks = [
  {
    link: "Overview",
    path: "/dashboard",
    icon: dashboardicon,
  },
  {
    link: "Tasks",
    path: "/tasks",
    icon: tasksicon,
  },
  {
    link: "Review",
    path: "/review",
    icon: reviewicon,
  },
  {
    link: "Visualize",
    path: "/visualize",
    icon: presicon,
  },
  {
    link: "Kanban",
    path: "/kanban",
    icon: boardicon,
  },
  {
    link: "Kanban Alerts",
    path: "/notifications",
    icon: reporticon,
  },
  {
    link: "Logout",
    path: "/logout",
    icon: logouticon,
  },


];

function Navbar() {
  // todo: change to true
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // screen resize
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth < 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonexpanded"}
      variants={variants}
      className={
        "py-10 h-screen flex flex-col border border-black bg-gradient-to-r from-blue-500 to-blue-600  relative" +
        (isExpanded ? " px-10" : " px-2 duration-500")
      } //custom-bg-image
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 md:flex hidden justify-center items-center border border-black"
      >
        <img src={RightArrowIcon} className="w-2" />
      </div>

      <div className="logo-div flex space-x-4 items-center">
        <img src={Logo} className="md:w-12 w-10 ml-2" />
        <span className={!isExpanded ? "hidden" : "block"}>Pro Manage</span>
      </div>

      <div className="flex flex-col space-y-8 mt-12">
        {navLinks.map((item, index) => (
          <div className="nav-links w-full " key={index}>
            <Link to={item.path}>
            <div
              onClick={() => setActiveIndex(index)}
              className={
                "flex space-x-3 w-full p-2 rounded " +
                (activeIndex === index
                  ? "bg-[#FFFFFF] text-black"
                  : " text-white") +
                (!isExpanded ? " pl-3" : "")
              }
            >
              <img src={item.icon} className="md:w-11 w-11" alt={item.link} />
              <span className={!isExpanded ? "hidden" : "block"}>
                {item.link}
              </span>
            </div>
          </Link>

          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Navbar;