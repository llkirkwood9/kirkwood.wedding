/**
 * Font Awesome Icon wrapper componenet created since the Font Awesome library does not support typescript
 * Without this component, a variable would need to be created for each icon, then passed into the FontAwesomeIcon component
 * This component removes that requirement since the prop's type is set to any
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    icon: any;
    className?: any;
};

const Icon = (props: Props) => {
    return <FontAwesomeIcon icon={props.icon} className={props.className} />;
};

export default Icon;
