
/**
 * Keep track of recent scores
 */
export default class ScoreTable {
    
    constructor() {
        this.scores = [];
    }

    async exportScoreToBackend(data) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log(data);
        await fetch('http://localhost:3000/score', {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            // Verifique a resposta do backend
            if (response.success) {
                console.log('Score exportado com sucesso para o backend!');
            } else {
                console.error('Falha ao exportar o score para o backend.');
            }
        })
        .catch(error => {
            console.error('Erro na requisição para o backend:', error);
        });
    };
    
    add(lines, points) {
        this.scores.unshift({
            lines,
            points,
            date: new Date()
        });
        this.exportScoreToBackend(this.scores[0])
        console.log('Newest score: ', this.scores[0]);
    }
    
    getNewest() {
        if (this.scores.length > 0) {
            return this.scores[0];
        }
    }
}
