import { useEffect } from "react";

function useTitle(title) {
    useEffect(() => {
        document.title = `${title} | SocialCubing`;
    }, [])
}

export default useTitle;