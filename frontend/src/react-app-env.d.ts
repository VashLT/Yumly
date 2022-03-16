/// <reference types="react-scripts" />

interface IntrinsicProps {
    id?: string;
    className?: string;
    ref?: React.Ref;
    // [key: string]: string;
}

type PageProps = IntrinsicProps & {
    withNav?: boolean
}

// storage
interface IcookiesStorage {
    getItem: (item: string) => string | undefined;
    setItem: (item: string, value: string, days?: number | undefined) => void;
    deleteItem: (item: string) => void;
}

interface Iobject {
    [key: string]: string;
}

interface IbackError {
    message: string;
    status_code: number;
    type: "error" | "warning";
}

type Iresponse<Response> = Response | IbackError;

interface Iuser {
    id: number;
    username: string;
    name: string;
    email: string;
    registered_at: string;
}

interface IresUSer extends Iresponse {
    data: {
        user?: Iuser;
        error?: string;
    }
}

interface IbasicUser {
    username: string;
}