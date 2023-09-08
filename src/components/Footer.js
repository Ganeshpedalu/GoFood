import React from 'react';
import { Link } from 'react-router-dom';
import '../components/footer.css'

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Link to="/" className="mb-3 text-light text-decoration-none">
              {/* Add your logo or icon here */}
              GoFood
            </Link>
            <span className="text-muted">© {new Date().getFullYear()} GoFood, Inc</span>
          </div>

          {/* Add more footer content or links here */}
          <div className="col-md-4 text-center">
            <Link to="/privacy" className="text-light text-decoration-none me-3">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-light text-decoration-none">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
