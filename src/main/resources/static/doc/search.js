let api = [];
const apiDocListSize = 1
api.push({
    name: 'default',
    order: '1',
    list: []
})
api[0].list.push({
    alias: 'ProductController',
    order: '1',
    link: 'the_type_product_controller.',
    desc: 'The type Product controller.',
    list: []
})
api[0].list[0].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://localhost:8080/api/v1/products',
    desc: 'Create Product.',
});
api[0].list[0].list.push({
    order: '2',
    deprecated: 'false',
    url: 'http://localhost:8080/api/v1/products',
    desc: 'Get all Products list.',
});
api[0].list[0].list.push({
    order: '3',
    deprecated: 'false',
    url: 'http://localhost:8080/api/v1/products/{id}',
    desc: 'Gets Products by id.',
});
api[0].list[0].list.push({
    order: '4',
    deprecated: 'false',
    url: 'http://localhost:8080/api/v1/products/{id}',
    desc: 'Update Product response entity.',
});
api[0].list[0].list.push({
    order: '5',
    deprecated: 'false',
    url: 'http://localhost:8080/api/v1/products/{id}',
    desc: 'Delete Product.',
});
api[0].list.push({
    alias: 'UserController',
    order: '2',
    link: 'the_type_user_controller.',
    desc: 'The type User controller.',
    list: []
})
api[0].list[1].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://localhost:8080/api/v1/users',
    desc: 'Create user.',
});
api[0].list[1].list.push({
    order: '2',
    deprecated: 'false',
    url: 'http://localhost:8080/api/v1/users',
    desc: 'Get all users list.',
});
api[0].list[1].list.push({
    order: '3',
    deprecated: 'false',
    url: 'http://localhost:8080/api/v1/users/{id}',
    desc: 'Gets users by id.',
});
api[0].list[1].list.push({
    order: '4',
    deprecated: 'false',
    url: 'http://localhost:8080/api/v1/users/{id}',
    desc: 'Update user response entity.',
});
api[0].list[1].list.push({
    order: '5',
    deprecated: 'false',
    url: 'http://localhost:8080/api/v1/user/{id}',
    desc: 'Delete user.',
});
api[0].list.push({
    alias: 'error',
    order: '3',
    link: 'error_code_list',
    desc: 'Error Code List',
    list: []
})
document.onkeydown = keyDownSearch;
function keyDownSearch(e) {
    const theEvent = e;
    const code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code === 13) {
        const search = document.getElementById('search');
        const searchValue = search.value.toLocaleLowerCase();

        let searchGroup = [];
        for (let i = 0; i < api.length; i++) {

            let apiGroup = api[i];

            let searchArr = [];
            for (let i = 0; i < apiGroup.list.length; i++) {
                let apiData = apiGroup.list[i];
                const desc = apiData.desc;
                if (desc.toLocaleLowerCase().indexOf(searchValue) > -1) {
                    searchArr.push({
                        order: apiData.order,
                        desc: apiData.desc,
                        link: apiData.link,
                        list: apiData.list
                    });
                } else {
                    let methodList = apiData.list || [];
                    let methodListTemp = [];
                    for (let j = 0; j < methodList.length; j++) {
                        const methodData = methodList[j];
                        const methodDesc = methodData.desc;
                        if (methodDesc.toLocaleLowerCase().indexOf(searchValue) > -1) {
                            methodListTemp.push(methodData);
                            break;
                        }
                    }
                    if (methodListTemp.length > 0) {
                        const data = {
                            order: apiData.order,
                            desc: apiData.desc,
                            link: apiData.link,
                            list: methodListTemp
                        };
                        searchArr.push(data);
                    }
                }
            }
            if (apiGroup.name.toLocaleLowerCase().indexOf(searchValue) > -1) {
                searchGroup.push({
                    name: apiGroup.name,
                    order: apiGroup.order,
                    list: searchArr
                });
                continue;
            }
            if (searchArr.length === 0) {
                continue;
            }
            searchGroup.push({
                name: apiGroup.name,
                order: apiGroup.order,
                list: searchArr
            });
        }
        let html;
        if (searchValue === '') {
            const liClass = "";
            const display = "display: none";
            html = buildAccordion(api,liClass,display);
            document.getElementById('accordion').innerHTML = html;
        } else {
            const liClass = "open";
            const display = "display: block";
            html = buildAccordion(searchGroup,liClass,display);
            document.getElementById('accordion').innerHTML = html;
        }
        const Accordion = function (el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;
            const links = this.el.find('.dd');
            links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
        };
        Accordion.prototype.dropdown = function (e) {
            const $el = e.data.el;
            let $this = $(this), $next = $this.next();
            $next.slideToggle();
            $this.parent().toggleClass('open');
            if (!e.data.multiple) {
                $el.find('.submenu').not($next).slideUp("20").parent().removeClass('open');
            }
        };
        new Accordion($('#accordion'), false);
    }
}

function buildAccordion(apiGroups, liClass, display) {
    let html = "";
    if (apiGroups.length > 0) {
        if (apiDocListSize === 1) {
            let apiData = apiGroups[0].list;
            let order = apiGroups[0].order;
            for (let j = 0; j < apiData.length; j++) {
                html += '<li class="'+liClass+'">';
                html += '<a class="dd" href="#_'+order+'_'+apiData[j].order+'_' + apiData[j].link + '">' + apiData[j].order + '.&nbsp;' + apiData[j].desc + '</a>';
                html += '<ul class="sectlevel2" style="'+display+'">';
                let doc = apiData[j].list;
                for (let m = 0; m < doc.length; m++) {
                    let spanString;
                    if (doc[m].deprecated === 'true') {
                        spanString='<span class="line-through">';
                    } else {
                        spanString='<span>';
                    }
                    html += '<li><a href="#_'+order+'_' + apiData[j].order + '_' + doc[m].order + '_' + doc[m].desc + '">' + apiData[j].order + '.' + doc[m].order + '.&nbsp;' + spanString + doc[m].desc + '<span></a> </li>';
                }
                html += '</ul>';
                html += '</li>';
            }
        } else {
            for (let i = 0; i < apiGroups.length; i++) {
                let apiGroup = apiGroups[i];
                html += '<li class="'+liClass+'">';
                html += '<a class="dd" href="#_'+apiGroup.order+'_' + apiGroup.name + '">' + apiGroup.order + '.&nbsp;' + apiGroup.name + '</a>';
                html += '<ul class="sectlevel1">';

                let apiData = apiGroup.list;
                for (let j = 0; j < apiData.length; j++) {
                    html += '<li class="'+liClass+'">';
                    html += '<a class="dd" href="#_'+apiGroup.order+'_'+ apiData[j].order + '_'+ apiData[j].link + '">' +apiGroup.order+'.'+ apiData[j].order + '.&nbsp;' + apiData[j].desc + '</a>';
                    html += '<ul class="sectlevel2" style="'+display+'">';
                    let doc = apiData[j].list;
                    for (let m = 0; m < doc.length; m++) {
                       let spanString;
                       if (doc[m].deprecated === 'true') {
                           spanString='<span class="line-through">';
                       } else {
                           spanString='<span>';
                       }
                       html += '<li><a href="#_'+apiGroup.order+'_' + apiData[j].order + '_' + doc[m].order + '_' + doc[m].desc + '">'+apiGroup.order+'.' + apiData[j].order + '.' + doc[m].order + '.&nbsp;' + spanString + doc[m].desc + '<span></a> </li>';
                   }
                    html += '</ul>';
                    html += '</li>';
                }

                html += '</ul>';
                html += '</li>';
            }
        }
    }
    return html;
}