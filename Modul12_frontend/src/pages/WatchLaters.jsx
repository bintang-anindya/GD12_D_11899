import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { getWatchLaters, removeFromWatchLaters } from "../api/apiWatchLater";
import TopNavbar from "../components/TopNavbar";

const WatchLaters = () => {
  const [watchLaters, setWatchLaters] = useState([]);

  // Define routes for TopNavbar
  const routes = [
    { path: "/user", name: "Home" },
    { path: "/user/content", name: "My Videos" },
    { path: "/user/watch-later", name: "Watch Later" },
  ];

  useEffect(() => {
    getWatchLaters()
      .then((data) => {
        setWatchLaters(data);
      })
      .catch((err) => {
        console.error("Error fetching watch later videos:", err);
      });
  }, []);

  const handleRemove = (id) => {
    removeFromWatchLaters(id)
      .then(() => {
        setWatchLaters(watchLaters.filter((video) => video.id !== id));
      })
      .catch((err) => {
        console.error("Error removing video from watch later:", err);
      });
  };

  return (
    <>
      <TopNavbar routes={routes} /> {/* Tambahkan TopNavbar */}
      <Container className="mt-4">
        <h1 className="text-light mb-4">Watch Later Videos</h1>
        <Row>
          {watchLaters.length > 0 ? (
            watchLaters.map((video) => (
              <Col xs={12} key={video.id} className="mb-3">
                <Card className="bg-dark text-light">
                  <Row className="g-0">
                    <Col md={4}>
                      <Card.Img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-100 h-100 object-fit-cover"
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body className="d-flex flex-column justify-content-between">
                        <div>
                          <Card.Title className="text-truncate">
                            {video.title}
                          </Card.Title>
                          <Card.Text>{video.description}</Card.Text>
                          <Card.Text>
                            <small className="text-muted">
                              Created by {video.creator}
                            </small>
                          </Card.Text>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <Card.Text className="text-muted">
                            Tanggal Ditambahkan: {video.date_added}
                          </Card.Text>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemove(video.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          ) : (
            <h5 className="text-center text-muted">
              Tidak ada video di Watch Later.
            </h5>
          )}
        </Row>
      </Container>
    </>
  );
};

export default WatchLaters;
