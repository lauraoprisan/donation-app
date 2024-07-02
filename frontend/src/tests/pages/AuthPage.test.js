import {render, screen} from '../../test-utils'
import {logRoles } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the custom matchers
import AuthPage from '../../pages/auth/AuthPage'; // Ensure the correct path
import user from '@testing-library/user-event';


describe("AuthPage tests", () => {
    test("renders the header ", () => {
        render(<AuthPage/>);
        const pageHeading = screen.getByRole("heading", {
            level:1,    //checks for h1
        });
        expect(pageHeading).toBeInTheDocument();
    });


    test("renders the inputs", () => {
        render(<AuthPage/>);
        const nameElements = screen.getAllByRole("textbox");
        expect(nameElements.length).toBeGreaterThan(0);
    });

    test("input for username is not rendered in login state", () => {
        render(<AuthPage/>);
        const userNameInput = screen.queryByRole("textbox",{
            name:"Username" //this is actually the value of the label
        })
        expect(userNameInput).not.toBeInTheDocument();
    });


    test("login button is rendered by default", () => {
        const view = render(<AuthPage/>);
        logRoles(view.container);   //to see all the nodes
        const submitButton = screen.getByRole("button",{
            name:"Log in",
        })
        // screen.debug()
        expect(submitButton).toBeInTheDocument();
    });

    test("signup button is not rendered by default", () => {
        render(<AuthPage/>);
        const submitButton = screen.queryByRole("button",{
            name:"Sign up",
        })
        expect(submitButton).not.toBeInTheDocument();
    });

    test("signup button is rendered when the user changes to signup state", async() => {
        user.setup()
        render(<AuthPage/>);

        const changeStateButton = screen.getByText("aici")
        await user.click(changeStateButton)
        const submitButton = screen.getByRole("button",{
            name:"Sign up",
        })
        // screen.debug()
        expect(submitButton).toBeInTheDocument();
    });

    test("input for username is rendered in signup state", async() => {
        user.setup()
        render(<AuthPage/>);

        const changeStateButton = screen.getByText("aici")
        await user.click(changeStateButton)
        const userNameInput = screen.getByRole("textbox",{
            name:"Username" //this is actually the value of the label
        })
        // screen.debug()
        expect(userNameInput).toBeInTheDocument();
    });

    test("double clicking on the changing status link means going back to login state - the log in button is rendered", async() => {
        user.setup()
        render(<AuthPage/>);

        const changeStateButton = screen.getByText("aici")
        await user.dblClick(changeStateButton)
        const submitButton = screen.getByRole("button",{
            name:"Log in"
        })
        // screen.debug()
        expect(submitButton).toBeInTheDocument();
    });

    test('elements are focused in the right order when using the tab button ', async()=>{
        user.setup();
        render(<AuthPage/>);
        const emailInput = screen.getByLabelText('Email')
        const passwordInput = screen.getByLabelText('Parola')
        const submitButton = screen.getByRole('button')

        await user.tab()
        expect(emailInput).toHaveFocus()
        await user.tab()
        expect(passwordInput).toHaveFocus()
        await user.tab()
        expect(submitButton).toHaveFocus()
    })

})

