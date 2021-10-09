'use strict'

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


// Theo IIFE
const app = (() => {
    const cars = [];
    
    const root = $('#root');
    const input = $('#input');
    const submit = $('#submit');



    return {
        add(car) {
            cars.push(car);
        },
        delete(index) {
            cars.splice(index, 1);
        },
        render () {
            const html = cars.map((car,index) => `
                <li>
                    <h1>${car}</h1>
                    <span class="delete" data-index="${index}">Delete</span>
                </li>
            `).join('')

            root.innerHTML = html;
        },
        handleDelete (e) {
            // Có thể console.log ar để xem
            // e là khi click vào cái gì của 'root' nó cũng trả về event, còn thêm e.target thì nó trả đúng những gì nó click, vd click thẻ h1 trong root thì trả về h1, click vào thẻ span của trong root thì trả về thẻ span
            // console.log(e.target);

            // Kiểm tra xem khi click vào chính nó hoặc thẻ cha chứa nó có class là 'delete' hay ko, nếu có thì trả về chính xác thẻ đó, nếu ko thì trả về null
            const deleteBtn = e.target.closest('.delete');
            // có thể console.log ra để xem
            // console.log(deleteBtn);

            if(deleteBtn) {
                // Lấy đúng cái data-index (dataset) mà User click để xóa nó
                const index = deleteBtn.dataset.index;
                // Có thể console.log ra xem
                console.log(index);

                // lấy đúng index khi click và đưa vào function delete của app để xóa nó
                // this ở đây là 'root' vì dưới function init bên dưới nó dc gán cho onclick của root nên this là root chứ ko phải là app như ta nghĩ, để chuyển this 'root' sang this'app' thì thêm .bind(this) dưới root.onclick của function init bên dưới
                this.delete(index);
                this.render();
                
            }

        },
        // Handle DOM events
        init () {
            // Vì this nó nằm trong 1 function khác dc gán vào onclick của submit nên nó hiểu this ở dây là submit, muốn this nó là 'app' thì các đơn giản là chuyển function gán cho onclick của submit là arrow function chứ ko cần khai báo _this=this bên ngoài function này nữa
            submit.onclick = () => {
                const car = input.value;
                this.add(car);
                // render ở đây là render lại sau khi add car vào array
                this.render();


                // Ô input thành trống sau khi nhất nút add , thông tin input trước đó sẽ mất đi và trả lại ô input trống như ban đầu (refresh lại ô input)
                input.value = null;
                // input.focus() là sau khi User click nút add thì con trỏ chuột vẫn nằm trong ô input để User nhập tiếp và add tiếp, nếu ko có nó thì cứ mổi lẩn nhấn nút add xong thì User lại phải click vào ô input thì mới có thể nhập tiếp và add tiếp
                input.focus()
            }


            root.onclick = this.handleDelete.bind(this);


            // Chỗ này là render lúc đầu, ví dụ lúc đầu trong array có 1 car thì nó render 1 car đầu tiên khi trình duyệt chạy
            this.render()

            
        }
    }
})();

app.init()
