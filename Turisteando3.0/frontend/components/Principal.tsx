import React from "react";
import { Container } from "reactstrap";
function Home() {

  return (
    <div className="page-header header-filter" >
      <Container >
        <div className="content-center brand" style={{textAlign:'center'}}>
          <h1 className="h1-seo">Turisteando</h1>
          <h3 className="d-none d-sm-block"> ¿Viajas? En esta plataforma podras encontrar diferentes
          servicios con un raiting confiables.</h3>
        </div>
        
      </Container>
    </div>
  );
}

export default Home;