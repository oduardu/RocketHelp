import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
    if(timestamp) {
        const date = timestamp.toDate();
        const day = date.toLocaleDateString('pt-BR');
        const time = date.toLocaleTimeString('pt-BR');
        return `${day} às ${time}h`;
        }
    }