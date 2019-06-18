import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {Link } from "react-router-dom"

const FooterPage = () => {
  return (
    <MDBFooter  className="font-small footer pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <Link to="/ranking">Streaming más votados</Link>
              </li>
              <li className="list-unstyled">
                <Link to="/">Inicio</Link>
              </li>
              
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.twitch.tv"> Twitch.tv </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
