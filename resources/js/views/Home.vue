<template>
    <div>
        <h3>This search books page</h3>
        <b-tabs>
            <b-tab title="Search" active @click="tabChanged">
                <div class="form-group">
                    <label for="q">Search:</label>
                    <input type="text" class="form-control" id="q" v-model="searchData.q">
                </div>

                <div class="form-group">
                    <button type="button" @click="searchBook(0)" :disabled="loading">Search</button>
                </div>
            </b-tab>
            <b-tab title="Advanced Search" @click="tabChanged">
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" class="form-control" id="title" v-model="searchData.title">
                </div>
                <div class="form-group">
                    <label for="author">Author:</label>
                    <input type="text" class="form-control" id="author" v-model="searchData.author">
                </div>
                <div class="form-group">
                    <button type="button" @click="searchBook(1)" :disabled="loading">Search</button>
                </div>
            </b-tab>
            <b-tab title="ISBN Search" @click="tabChanged">
                <div class="form-group">
                    <label for="isbn">ISBN:</label>
                    <input type="text" class="form-control" id="isbn" v-model="searchData.isbn">
                </div>
                <div class="form-group">
                    <button type="button" @click="searchBook(2)" :disabled="loading">Search</button>
                </div>
            </b-tab>
        </b-tabs>

        <div class="alert alert-primary" role="alert" v-if="loading">
            Loading...
        </div>
        <div v-if="isbnData && isbnData.bib_key">
            <h3>{{isbnData.bib_key}}</h3>
            <p><a :href="isbnData.info_url" target="_blank"><img :src="isbnData.thumbnail_url" alt="avatar"></a></p>
        </div>

        <div class="books" v-if="booksData.docs">
            <h3>Total Items: <strong>{{booksData.numFound}}</strong></h3>
            <div v-for="book in booksData.docs" :key="book.key" class="book-item">
                <div>Title: <strong>{{book.title}}</strong></div>
                <div v-if="book.subtitle">
                    <p>SubTitle: <strong>{{book.subtitle}}</strong></p>
                </div>
                <div v-if="book.author_name">
                    <p>Authors: <strong>{{book.author_name.join()}}</strong></p>
                </div>
                <div v-if="book.edition_count">
                    <p><strong>{{book.edition_count}}</strong> editions </p>
                </div>
                <div v-if="book.first_publish_year">
                    <p>first published in: <strong>{{book.first_publish_year}}</strong></p>
                </div>
            </div>

            <div class="alert alert-primary" role="alert" v-if="loading">
                Loading...
            </div>

            <b-pagination align="center" size="md" :total-rows="numFound" v-model="currentPage" :per-page="100">
            </b-pagination>
        </div>
    </div>
</template>
<script>
import {setAuthHeader} from '../axiosApi';
export default {
    data() {
        return {
            loading: false,
            searchType: 0,
            booksData: {},
            currentPage: 1,
            numFound: 0,
            isbnData: {},
            searchData: {
                q: '',
                title: '',
                isbn: '',
                author: ''
            }
        };
    },
    created() {
        if (this.$route.query && this.$route.query.token) {
            setAuthHeader(localStorage.getItem('token_type'), localStorage.getItem('access_token'));
        }
        this.$store.dispatch('auth/userInfo').then(() => this.$router.push('/')).catch(console.error)
    },
    methods: {
        searchBook (search_type) {
            if (search_type === undefined) {
                return false;
            }
            this.searchType = search_type;
            this.loading = true;
            this.searchData.searchType = search_type; // search = 0, advanced search = 1, isbn = 2
            this.searchData.page = this.currentPage;
            this.$store.dispatch('books/search', {q: this.searchData})
                .then((res) => {
                    if (this.searchType === 2) { // isbn
                        if (res.books) {
                            let _isbnData = {};
                            Object.keys(res.books).map((key, index) => {
                                this.isbnData = res.books[key]
                            });
                        }
                    } else { // search / advanced search
                        if (res.books) {
                            this.booksData = res.books;
                            this.numFound = res.books.numFound;
                        }
                    }
                    this.loading = false;
                })
                .catch(console.error)
        },
        tabChanged () {
            this.isbnData = {};
            this.booksData = {};
            this.numFound = 0;
            this.currentPage = 1;
            this.searchType = undefined;
        }
    },
    watch: {
        currentPage: function (val) {
            this.searchBook(this.searchType);
        }
    }
}
</script>
<style>
    .book-item{
        margin-bottom: 10px;
    }
</style>
