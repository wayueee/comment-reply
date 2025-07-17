<template>
  <div class="bg-[#eaecf1] max-h-1000">
    <div>
      <Card
        v-for="(item, id) in sortComments"
        :key="id"
        :data="item"
        :reply-to="replyTo"
        @upComent="addPlusComent"
        @downComent="addMinusComent"
        @replyComent="addReplyComent"
        @comentReply="addComentReply"
        @editComent="addEditComent"
        @deleteComent="addDeleteComent"
        @replyComentChild="replyComentChild"
        @upComentChild="addPlusChild"
        @downComentChild="addMinusChild"
        @editText="editText"
        @updateText="updateText"
        @comentReplyChild="comentReplyChild"
      />
    </div>
    <div
      v-for="myuser in myUser"
      :key="myuser"
      class="flex justify-center mt-2 pb-10"
    >
      <div class="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl">
        <div class="flex relative">
          <img
            class="w-10 h-10 rounded-full mx-3"
            :src="myuser.avatar"
            alt=""
          />
          <textarea
            v-model="inputText"
            type="text"
            placeholder="Reply Comment"
            class="border rounded-lg px-4 w-115 max-sm:w-60 h-20"
          ></textarea>
          <button
            class="bg-blue-500 text-white mx-5 px-4 py-2 rounded absolute right-1 max-sm:right-0"
            @click="inputData"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        {
          id: 1,
          name: "amyrobson",
          avatar: "/images/avatars/image-amyrobson.png",
          text: "Impressive! Though it seems the drag feature could be improved. But overall it looks increadible. you've nailde the desain and teh responsiveness at various breakpoints works really well",
          time: "1 month ago",
          votes: 12,
          replies: [],
          showReply: false,
        },
        {
          id: 2,
          name: "maxblagun",
          avatar: "/images/avatars/image-maxblagun.png",
          avatarReply: "/images/avatars/image-juliusomo.png",
          text: "Woah, your project looks awesome! How long have you been coding for? i'm still new, but think i want to dive into React as well soon. Perhaps you can give me an insight on where i can learn React? Thanks!",
          time: "2 weeks ago",
          votes: 5,
          showReply: false,
          replies: [
            {
              id: 1,
              name: "ramsesmiron",
              avatar: "/images/avatars/image-ramsesmiron.png",
              avatarReply: "/images/avatars/image-juliusomo.png",
              text: "if you're still new. I'd recommend focusing on the fundamentals of HTML, CSS and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
              time: "2 weeks ago",
              votes: 4,
              disableReply: true,
              showReply: false,
              replyComent: "",
              repliedUsername: "maxblagun",
              replies: [],
            },
            {
              id: 2,
              name: "juliusomo",
              avatar: "/images/avatars/image-juliusomo.png",
              avatarReply: "/images/avatars/image-juliusomo.png",
              text: "i couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant",
              time: "2 days ago",
              votes: 2,
              disableReply: false,
              showEdit: false,
              showReply: true,
              myUserShowReply: true,
              showModalDel: false,
              repliedUsername: "ramsesmiron",
              replies: [],
            },
          ],
        },
      ],
      inputText: "",
      replyTo: null,
      myUser: [
        {
          name: "juliusomo",
          avatar: "/images/avatars/image-juliusomo.png",
        },
      ],
    };
  },

  methods: {
    addPlusComent(id) {
      const comment = this.comments.find((item) => item.id === id);
      if (comment) comment.votes++;
    },
    addMinusComent(id) {
      const comment = this.comments.find((item) => item.id === id);
      if (comment && comment.votes > 0) comment.votes--;
    },
    addPlusChild(childId, parentId) {
      const comment = this.comments.find((item) => item.id === parentId);
      const commentChild = comment.replies.find((item) => item.id === childId);
      if (commentChild) commentChild.votes++;
    },
    addMinusChild(childId, parentId) {
      const comment = this.comments.find((item) => item.id === parentId);
      const commentChild = comment.replies.find((item) => item.id === childId);
      if (commentChild && commentChild.votes > 0) commentChild.votes--;
    },
    addReplyComent(id) {
      const replyComent = this.comments.find((item) => item.id === id);
      if (replyComent) replyComent.showReply = !replyComent.showReply;
    },
    replyComentChild(childId, parentId) {
      const findParentItem = this.comments.find((item) => item.id === parentId);
      const reply = findParentItem.replies.find((item) => item.id === childId);
      if (reply.name != "juliusomo") {
        reply.showReply = !reply.showReply;
        reply.editText = false
      }
    },
    inputData() {
      const d = new Date();
      if (this.inputText.trim() === "") return;
      this.comments.push({
        id: Date.now(),
        name: `juliusomo`,
        avatar: "/images/avatars/image-juliusomo.png",
        text: this.inputText,
        votes: 0,
        time: d.getMinutes() + " minutes ago",
        disableReply: false,
        showEdit: false,
        showReply: false,
        myUserShowReply: true,
        replyComent: "",
        replies: [],
      });

      this.inputText = "";
    },
    addComentReply(item, id) {
      const addReply = this.comments.find((item) => item.id === id);
      const inputIdx = this.comments.findIndex((data) => data.id === item.id);
      const d = new Date();
      if (addReply && addReply.replyComent.trim()) {
        addReply.replies.push({
          id: Date.now(),
          name: `juliusomo`,
          avatar: "/images/avatars/image-juliusomo.png",
          text: this.comments[inputIdx].replyComent,
          votes: 0,
          time: d.getMinutes() + " minutes ago",
          disableReply: false,
          showEdit: false,
          showReply: true,
          myUserShowReply: true,
          showModalDel: false,
          replyComent: "",
          repliedUsername: addReply.name,
          replies: [],
        });
        this.comments[inputIdx].replyComent = "";
        addReply.showReply = false;
      }
    },
    addDeleteComent(dataChild, dataParent) {
      const comment = this.comments.find((data) => data.id === dataParent);
      const reply = comment.replies.find((item) => item.id === dataChild);
      if (comment) {
        comment.replies = comment.replies.filter(
          (comment) => comment.id !== dataChild
        );
      }
      if (reply) {
        reply.replies = reply.replies.filter(
          (reply) => reply.id !== dataParent
        );
      }
    },
    editText(dataChild, dataParent,) {
      const findParentItem = this.comments.find(
        (item) => item.id === dataParent
      );
      const reply = findParentItem.replies.find(
        (item) => item.id === dataChild
      );
      // const childReply = reply.replies.find(
      //   (item) => item.id === ChildComments
      // );
      reply.showEdit = true;
      console.log(reply);
      
    },
    updateText(dataChild, dataParent) {
      const findParentItem = this.comments.find(
        (item) => item.id === dataParent
      );
      const reply = findParentItem.replies.find(
        (item) => item.id === dataChild
      );
      reply.showEdit = false;
    },
    comentReplyChild(dataChild, dataParent) {
      const findParentItem = this.comments.find(
        (item) => item.id === dataParent
      );
      const reply = findParentItem.replies.find(
        (item) => item.id === dataChild
      );

      const d = new Date();
      if (reply && reply.replyComent.trim()) {
        findParentItem.replies.push({
          id: Date.now(),
          name: `juliusomo`,
          avatar: "/images/avatars/image-juliusomo.png",
          text: reply.replyComent,
          votes: 0,
          time: d.getMinutes() + " minutes ago",
          disableReply: false,
          showEdit: false,
          showReply: true,
          myUserShowReply: true,
          showModalDel: false,
          replyComent: "",
          repliedUsername: "ramsesmiron",
          replies: [],
        });
        reply.replyComent = "";
      }
    },
  },
  computed: {
    sortComments() {
      return [...this.comments].sort((a, b) => b.votes - a.votes);
    },
  },
};
</script>
