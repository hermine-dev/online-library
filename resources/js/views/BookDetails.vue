<template>
    <div>
        <h3>This books details page</h3>
        <div v-if="bookData && bookData.key">
            <h3>Book key: <strong>{{bookData.key}}</strong></h3>
            <h3>{{bookData.title}}</h3>
            <h6>{{bookData.title_suggest}}</h6>
            <p v-if="bookData.subject"><strong>Subjects</strong>: {{bookData.subject.join()}}</p>
            <p v-if="bookData.first_publish_year"><strong>First Published</strong>: {{bookData.first_publish_year}}</p>
            <p v-if="bookData.edition_count"><strong>Edition Count</strong>: {{bookData.edition_count}}</p>
            <p v-if="bookData.isbn"><strong>ISBNs</strong>: {{bookData.isbn.join()}}</p>
            <p v-if="bookData.publisher"><strong>Publisher</strong>: {{bookData.publisher.join()}}</p>
            <p v-if="bookData.contributor"><strong>Contributor</strong>: {{bookData.contributor.join()}}</p>
            <a :href="`https://openlibrary.org${bookData.key}`" target="_blank">More Info</a>
        </div>
        <div v-else>No any data</div>
    </div>
</template>
<script>
    import {setAuthHeader} from '../axiosApi';

    export default {
        data() {
            return {};
        },
        computed: {
            bookData() {
                const bookDetails = localStorage.getItem('bookDetails') && JSON.parse(localStorage.getItem('bookDetails'));
                const stateBookDetails = this.$store.getters['books/getBookDetails'];
                if (stateBookDetails.key) {
                    return stateBookDetails;
                } else {
                    return bookDetails;
                }
            }
        },
        created() {
            setAuthHeader(localStorage.getItem('token_type'), localStorage.getItem('access_token'));
            this.$store.dispatch('auth/userInfo').then(() => {}).catch(console.error)
        }
    }
</script>
<style>

</style>
