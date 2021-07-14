export class SessionStorageService {
    static clearQuickReservationFormsStorage() {
        for (var i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key.indexOf(`quick-reservation`) !== -1) {
                sessionStorage.removeItem(key);
            }
        }
    }
}