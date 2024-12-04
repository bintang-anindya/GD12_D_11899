import { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { GetAllContents } from "../api/apiContent";
import { getThumbnail } from "../api";
import { BsClock } from "react-icons/bs"; // Ikon jam

const DashboardPage = () => {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    GetAllContents()
      .then((data) => {
        setContents(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-nowrap text-light">Rekomendasi Untukmu</h1>
        <hr className="border-top border-light opacity-50 w-100" />
      </Stack>

      {isLoading ? (
        <div className="text-center">
          <Spinner
            as="span"
            animation="border"
            variant="primary"
            size="lg"
            role="status"
            aria-hidden="true"
          />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : contents?.length > 0 ? (
        <Row>
          {contents.map((content) => (
            <Col md={6} lg={4} className="mb-3" key={content.id}>
              <div
                className="card bg-dark text-white position-relative"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={getThumbnail(content.thumbnail)}
                  className="card-img w-100 h-100 object-fit-cover bg-light"
                  alt="Thumbnail"
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">
                    {content.title}
                  </h5>
                  <p className="card-text">{content.description}</p>
                </div>

                {/* Tombol dengan ikon jam */}
                <button
                  className="btn btn-success position-absolute"
                  style={{
                    bottom: "10px",
                    right: "10px",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                  title="Tambahkan ke Watch Later"
                  onClick={() => console.log(`Tambah ${content.title} ke Watch Later`)}
                >
                  <BsClock size={20} /> {/* Ikon jam */}
                </button>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="dark" className="text-center">
          Tidak ada video untukmu saat ini ☹️
        </Alert>
      )}
    </Container>
  );
};

export default DashboardPage;
