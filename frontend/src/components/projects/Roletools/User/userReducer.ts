
type State = {
    profile?: Profile;
    isLoading: boolean;
    error?: string;
   }
   
   type Profile = {
    user: string;
    friends: string[];
    token: string;
    };

    type Action =
 | { type: 'request' }
 | { type: 'success', results: Profile }
 | { type: 'failure', error: string };


export default (state : State, action : Action): State => {

    switch (action.type) {
        case 'request':
        return { isLoading: true };
        case 'success':
        return { isLoading: false, profile: action.results };
        case 'failure':
        return { isLoading: false, error: action.error };
        }
        

}