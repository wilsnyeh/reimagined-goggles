
export default function MoreInfoButton({moreInfo, setMoreInfo}) {
    const handleMoreInfoClick = async (e) => {
        e.preventDefault();
        setMoreInfo(true);
    }
}

export function handleMoreInfoClick() {}