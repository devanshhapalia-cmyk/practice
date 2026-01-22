import { fetchStaticText } from "../Context/sanityClient";
import { useEffect,useState } from "react";
// import '../assets/style/header.css';
function Header() {
    const [staticText, setStaticText] = useState([]);

  useEffect(() => {
    const loadText = async () => {
      const data = await fetchStaticText();
      setStaticText(data);
    };
    loadText();
  }, []);
  const getText = (key) =>
    staticText.find(item => item.key === key)?.text || "";
  console.log(getText("title"));
    return(
        <>
            <h2 className="text-[#1E6F9F] text-center text-[48px] mt-10"> {getText("title")}</h2>
        </>
    )
}
export default Header;