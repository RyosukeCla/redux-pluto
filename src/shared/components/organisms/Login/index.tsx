import { compose } from "redux";
import { reduxForm, isInvalid } from "redux-form";
import { connect } from "react-redux";
import { login } from "../../../redux/modules/auth";
import normalizeFormError from "../../utils/normalizeFormError";
import validate from "../../../validators/login";
import LoginForm from "./LoginForm";
import { RootState } from "../../../../shared/redux/modules/reducer";
import { Dispatch } from "redux";

export default compose<React.FC>(
  connect((state: RootState) => ({
    invalid: isInvalid("loginForm")(state),
    csrf: state.app.csrf.token,
  })),
  reduxForm({
    form: "loginForm",
    validate,
    onSubmit(
      { username, password }: { username: string; password: string },
      dispatch: Dispatch<any>,
      ownProps: {
        location: any;
      },
    ) {
      return dispatch(
        login(username, password, ownProps.location.query.location || "/"),
      ).catch(normalizeFormError);
    },
  }),
)(LoginForm);
