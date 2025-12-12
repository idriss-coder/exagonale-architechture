"use client";

import React, {
    ComponentType,
    forwardRef,
    useEffect,
    useReducer,
    useId,
} from "react";

// --------------------------------------
// HOC: withLogger — log la valeur d’un input
// --------------------------------------
const withLogger = <P extends object>(
    Component: ComponentType<P & React.RefAttributes<HTMLInputElement>>
) => {
    const LoggerComp = forwardRef<HTMLInputElement, P>((props, ref) => {
        useEffect(() => {
            if (ref && typeof ref !== "function" && ref.current) {
                console.log("Input value is:", ref.current.value);
            }
        }, [ref]);

        return <Component {...props} ref={ref} />;
    });

    LoggerComp.displayName = `withLogger(${
        Component.displayName || Component.name || "Component"
    })`;

    return LoggerComp;
}

// --------------------------------------
// Typage du state & reducer
// --------------------------------------
type RegisterState = {
    email: string;
    password: string;
    name: string;
    password_confirmation: string;
};

type RegisterAction =
    | { type: "SET_FIELD"; field: keyof RegisterState; value: string }
    | { type: "RESET" };

const initialState: RegisterState = {
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
};

const registerReducer = (
    state: RegisterState,
    action: RegisterAction
): RegisterState => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

// --------------------------------------
// RenderHostOnEmail
// --------------------------------------
type RenderHostProps = {
    email: string;
    render: (host: string) => React.ReactNode;
};

const RenderHostOnEmail = ({ email, render }: RenderHostProps) => {
    const host = email.includes("@")
        ? email.substring(0, email.indexOf("@"))
        : "";

    return render(host);
};

// --------------------------------------
// Input Component typé
// --------------------------------------
type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "label"
> & {
    label: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, ...props }, ref) => {
        const id = useId();
        return (
            <div className="flex flex-col gap-1 mb-3">
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-neutral-300"
                >
                    {label}
                </label>

                <input
                    id={id}
                    ref={ref}
                    {...props}
                    autoComplete="off"
                    className="px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-100 focus:border-white focus:outline-none transition-colors"
                />
            </div>
        );
    }
);
Input.displayName = "Input";

// HOC
const InputWithLogger = withLogger(Input);

// --------------------------------------
// Form Component
// --------------------------------------
const RegisterForm = () => {
    const [registerData, dispatch] = useReducer(
        registerReducer,
        initialState
    );

    const updateInput =
        (field: keyof RegisterState) =>
            (event: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({
                    type: "SET_FIELD",
                    field,
                    value: event.target.value,
                });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted:", registerData);
    };

    const handleReset = () => dispatch({ type: "RESET" });

    return (
        <div className="max-w-md mx-auto border border-neutral-800 rounded-xl p-6 bg-neutral-950 shadow-lg shadow-black/20">
            <h2 className="text-xl font-semibold text-white mb-4">Register</h2>

            <form autoCapitalize={"on"} autoComplete={"off"} onSubmit={handleSubmit} className="flex flex-col gap-3">
                <FormRow>
                    <InputWithLogger
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="example@mail.com"
                        value={registerData.email}
                        onChange={updateInput("email")}
                    />

                    <InputWithLogger
                        label="Name"
                        name="name"
                        placeholder="Your name"
                        value={registerData.name}
                        onChange={updateInput("name")}
                    />

                    <InputWithLogger
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={updateInput("password")}
                    />
                    <RenderHostOnEmail
                        email={registerData.email}
                        render={(host) => (
                            <InputWithLogger
                                label={`Confirm Password ${host ? `for ${host}` : ""}`}
                                name="password_confirmation"
                                type="password"
                                placeholder="••••••••"
                                value={registerData.password_confirmation}
                                onChange={updateInput("password_confirmation")}
                            />
                        )}
                    />
                </FormRow>

                <button
                    type="submit"
                    className="mt-2 py-2 rounded-md bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
                >
                    Register
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="py-2 rounded-md bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors"
                >
                    Reset
                </button>
            </form>

            <pre className="mt-4 text-neutral-400 text-xs whitespace-pre-wrap bg-neutral-900 p-3 rounded-md border border-neutral-800">
        {JSON.stringify(registerData, null, 2)}
      </pre>
        </div>
    );
};

const FormRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
                                                                     children,
                                                                     className = "",
                                                                     ...props
                                                                 }) => {
    return (
        <div {...props} className={`flex flex-col gap-1 ${className}`}>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;

                return React.cloneElement(child, {
                    style: {
                        ...props.style,
                        minWidth: "400px",
                    },
                });
            })}
        </div>
    );
}

export default RegisterForm;