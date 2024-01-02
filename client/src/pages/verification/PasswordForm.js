import {
  MDBInput,
  MDBBtn,
  MDBCardImage,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBValidationItem,
  MDBValidation,
} from "mdb-react-ui-kit";

const PasswordForm = ({ password, setPassword, handleSubmit, cancel }) => (
  <MDBRow className="g-0 d-flex align-items-center">
    <MDBCol md="4">
      <MDBCardImage
        width="433"
        height="278"
        fluid
        src="https://source.unsplash.com/random/433x278/?social"
        alt=""
        style={{ transform: "scale(0)", transition: "transform 1s" }}
        onLoad={(e) => {
          e.target.style.transform = "scale(1)";
        }}
        loading="lazy"
      />
    </MDBCol>

    <MDBCol md="8">
      <MDBCardBody>
        <MDBValidation>
          <MDBValidationItem feedback="Please enter your password" invalid>
            <MDBInput
              required
              wrapperClass="mb-5"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </MDBValidationItem>

          <div className="d-flex justify-content-end">
            <MDBBtn
              formNoValidate
              color="danger"
              onClick={cancel}
              className="w-25"
              type="reset"
            >
              Cancel
            </MDBBtn>
            <MDBBtn
              // disabled={!password}
              onClick={Boolean(password) && handleSubmit}
              className="ms-4 w-75"
              type="submit"
            >
              Confirm
            </MDBBtn>
          </div>
        </MDBValidation>
      </MDBCardBody>
    </MDBCol>
  </MDBRow>
);

export default PasswordForm;
