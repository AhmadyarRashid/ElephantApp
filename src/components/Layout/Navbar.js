import React from "react";
import { Menu, Icon } from "antd";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

const $ = window.$;

const SubMenu = Menu.SubMenu;


class Navbar extends React.Component {


  componentDidMount() {

    let $ = window.$;
    var url = window.location;
    var element = $('ul#sidebarnav a').filter(function () {
      return this.href == url;
    }).addClass('active').parent().addClass('active');
    while (true) {
      if (element.is('li')) {
        element = element.parent().addClass('in').parent().addClass('active').children('a').addClass('active');

      }
      else {
        break;
      }
    }
    $(".sidebartoggler").on('click', function () {
      if ($("body").hasClass("mini-sidebar")) {
        $("body").trigger("resize");
        $("body").removeClass("mini-sidebar");
        $('.navbar-brand span').show();
      }
      else {
        $("body").trigger("resize");
        $("body").addClass("mini-sidebar");
        $('.navbar-brand span').hide();
      }
    });

    $(".nav-toggler").click(function () {
      $("body").toggleClass("show-sidebar");
      $(".nav-toggler i").toggleClass("ti-menu");
      $(".nav-toggler i").addClass("ti-close");
    });
    $('#sidebarnav a').on('click', function (e) {
      $("body").toggleClass("show-sidebar");
      $(".nav-toggler i").toggleClass("ti-menu");
      $(".nav-toggler i").addClass("ti-close");
    });
  }


  onLogoutClick = (e) => {

    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      this.props.history.push('/login');
    } catch (e) {
      console.log(e);
    }
  };



  render() {
    return (

      <header className="topbar">
                <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                    <div className="navbar-header">
                        <Link to="/home" className="navbar-brand">
                            <b>
                                <img src="assets/images/logo1.png" alt="homepage" className="dark-logo" style={{ width: "80%" }}/>
                                <img src="assets/images/logo1.png" alt="homepage" className="light-logo" style={{ width: "80%" }} />
                            </b>
                            <span>
                            </span>
                        </Link>
                    </div>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link nav-toggler d-block d-sm-none waves-effect waves-dark" href="javascript:void(0)">
                                    <i className="ti-menu"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link sidebartoggler d-none d-lg-block d-md-block waves-effect waves-dark" href="javascript:void(0)">
                                    <i className="icon-menu"></i></a>
                            </li>
                        </ul>
                        <ul className="navbar-nav my-lg-0">
                            <li className="nav-item dropdown u-pro" onClick={() => this.onLogoutClick()}>
                                    <i style={{paddingRight:15}} class="fas fa-power-off fa-lg"></i>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

    );
  }
}

export default withRouter(Navbar);
