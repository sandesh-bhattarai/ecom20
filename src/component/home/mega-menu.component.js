const MegaMenu = () => {
    return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler px-0"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarExampleOnHover"
            aria-controls="navbarExampleOnHover"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarExampleOnHover">
            <ul
              className="navbar-nav me-auto ps-lg-0"
              style={{ paddingLeft: "0.5rem" }}
            >
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Regular link
                </a>
              </li>
              <li className="nav-item dropdown dropdown-hover position-static">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mega menu
                </a>
                <div
                  className="dropdown-menu w-100 mt-0"
                  aria-labelledby="navbarDropdown"
                  style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                >
                  <div className="container">
                    <div className="row my-4">
                      <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
                        <div className="list-group list-group-flush">
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Lorem ipsum
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Dolor sit
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Amet consectetur
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Cras justo odio
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Adipisicing elit
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 mb-3 mb-lg-0">
                        <div className="list-group list-group-flush">
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Explicabo voluptas
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Perspiciatis quo
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Cras justo odio
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Laudantium maiores
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Provident dolor
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 mb-3 mb-md-0">
                        <div className="list-group list-group-flush">
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Iste quaerato
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Cras justo odio
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Est iure
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Praesentium
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Laboriosam
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="list-group list-group-flush">
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Cras justo odio
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Saepe
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Vel alias
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Sunt doloribus
                          </a>
                          <a
                            href=""
                            className="list-group-item list-group-item-action"
                          >
                            Cum dolores
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>)
}

export default MegaMenu;