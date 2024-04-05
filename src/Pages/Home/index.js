import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const cx = classNames.bind(styles);

function Home() {
  return (
    <>
      <Header />
      <div className={cx("container-fluid", "body")}>
        <div className={cx("home")}>
          <div className={cx("content")}>
            <div className={cx("wrapper-left")}>
              <h1>Hơn cả một bệnh viện</h1>
            </div>
            <div className={cx("wrapper-right")}>
              <div className={cx("wrapper-right-content")}>
                <div className={cx("character")}>Nhanh chóng</div>
                <div className={cx("character")}>Uy tín</div>
                <div className={cx("character")}>Chất lượng</div>
                <div className={cx("character")}>Thân thiện</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
