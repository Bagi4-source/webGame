const questions = {
    "Как называется чертеж земной поверхности?": {
        "true_answer": 0,
        "answers": ["Карта", "Схема", "Условные знаки"],
        "score": 10,
        "img": "https://u.foxford.ngcdn.ru/uploads/tinymce_file/file/14205/e0a803ccccb8dc18.png"
    },
    "Что является причиной возникновения цунами?": {
        "true_answer": 0,
        "answers": ["Моретрясение", "Извержение вулканов", "Океанский ветер"],
        "score": 10,
        "img": "https://waterservice.kz/blog/img/art110-1.jpg"
    },
    "Кто является первым создателем географической карты?": {
        "true_answer": 0,
        "answers": ["Эратосфен", "Аренст", "Героклит"],
        "score": 20,
        "img": "https://www.pnp.ru/upload/entities/2021/09/28/15/article/detailPicture/34/6a/ba/b6/3dddea75d60e01ebfea83b88eac9df64.jpg"
    },
    "Какие течения относятся к холодным?": {
        "true_answer": 2,
        "answers": ["Аляскинское и Гольфстрим", "Гвианское и Калифорнийское", "Калифорнийское и Перуанское"],
        "score": 20,
        "img": "https://assets-global.website-files.com/599873abab717100012c91ea/5fa147823ed7903feb284a5d_%D1%82%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D1%8F_2%20(1)%20(1)%20(1)%20(1)%20(1)%20(1).png"
    },
    "Чему равна общая площадь поверхности земли?": {
        "true_answer": 0,
        "answers": ["510.2 млн. кв. км.", "423.2 млн. кв.км.", "20.3 млн. кв. км."],
        "score": 30,
        "img": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Africa_and_Europe_from_a_Million_Miles_Away.png"
    },
    "Кто был автором теории литосферных плит?": {
        "true_answer": 1,
        "answers": ["М. Фернан", "А. Вегенер", "Д. Кук"],
        "score": 30,
        "img": "https://u.foxford.ngcdn.ru/uploads/tinymce_image/image/75975/35dc9fb8e97db489.png"
    }
}

const error = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
    <g transform="scale(2)">
    <circle style="fill:#f44336" cx="8" cy="8" r="7"/>
    <rect style="fill:#ffffff" width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
    <rect style="fill:#ffffff" width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
    </g>
    </svg>`;
const ok = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
    <g transform="scale(2)">
    <circle style="fill:#4caf50" cx="8" cy="8" r="7"/>
    <path style="fill:#ffffff" d="M 11.535,4.4 7.2928,8.6 4.4647,5.8 3.0506,7.2 5.8787,10.1 7.2928,11.5 12.949,5.8 Z"/>
    </g>
    </svg>`;


let index = 0;

function end_test() {
    let score = 0;
    let max_score = 0;
    for (let key in questions) {
        max_score += questions[key]["score"]
    }

    let results = '';
    $('.question').each(function () {
        let icon = error;
        let val = $(this).find('input:checked').val();
        let i = $('.question').index(this);
        let key = Object.keys(questions)[i];
        let this_score = questions[key]["score"];

        if (val) {
            val = parseInt(val);

            if (questions[key]["true_answer"] === val) {
                score += this_score
                icon = ok;
            }
        }
        results += `<div class="result">
            <div>
                <span class="result-text ${icon === ok ? 'ok' : 'error'}">${key}</span>
                <span>${this_score} баллов</span>
            </div>
            <div class="icon">
                ${icon}
            </div>
        </div>`;
    });

    $('#test').html(`
    <div class="question">
        <div class="question-title">
                <span class="question-title-text">
                    Ваш результат ${score}/${max_score}!
                </span>
        </div>
        <div class="results">
            ${results}
        </div>
        <div class="navigation">
            <div class="total-result">${score}/${max_score}</div>
            <div class="btn reload" onclick="location.reload()">Начать снова</div>
        </div>
    </div>`);
}

function get_answer(answer, i) {
    let questions = document.querySelectorAll('.question')
    let count = questions.length;
    return `
    <div class="answer">
        <label>
            <input class="answer-input" type="radio" value="${i}" name="radio-${count}">
            <span class="answer-text">${answer}</span>
        </label>
    </div>`;
}

function get_question(question, answers) {
    let answers_element = '';
    for (let i in answers) {
        let answer = answers[i];
        answers_element += get_answer(answer, i);
    }
    return `
    <div class="question">
        <div class="question-title">
                <span class="question-title-text">
                    ${question}
                </span>
        </div>
        <div class="question-inner">
            <div class="answers">
                ${answers_element}
            </div>
            <img class="question-img" src="${questions[question]['img']}" alt="">
        </div>
        <div class="navigation">
            <div class="btn prev" onclick="prev_question()"><</div>
            <div class="btn next" onclick="next_question()">></div>
        </div>  
    </div>`;
}

function add_question(question, answers) {
    let element = get_question(question, answers);
    let test = document.querySelector('#test');
    test.innerHTML += element;
}

function display_questions(i) {
    $('.question').fadeOut(400);
    setTimeout(function () {
        $('.question').eq(i).fadeIn();
        if (i === 0) {
            $('.prev').hide();
            $('.navigation').css('justify-content', 'flex-end');
        } else {
            $('.prev').show();
            $('.navigation').css('justify-content', 'space-between');
        }
        if (i === $('.question').length - 1) {
            $('.next').text('Завершить').attr("onclick", "end_test()").width(120);
        } else {
            $('.next').text('>').attr("onclick", "next_question()").width(100);
        }

    }, 400);
}

function next_question() {
    if (index + 1 < $('.question').length) {
        index += 1;
        display_questions(index);
    }
}

function prev_question() {
    if (index - 1 >= 0) {
        index -= 1;
        display_questions(index);
    }
}

function create_test() {
    for (let question in questions) {
        let answers = questions[question]['answers'];
        add_question(question, answers);
    }
    $('.question').hide();
    display_questions(0);
}

create_test();
