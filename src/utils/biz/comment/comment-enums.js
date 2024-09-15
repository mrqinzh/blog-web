// 定义枚举类型 (在 JavaScript 中使用对象来代替 TypeScript 枚举)
const CommentType = {
  COMMENT: "COMMENT", // 评论
  MESSAGE: "MESSAGE", // 留言
};

// 创建一个映射对象，将枚举值与中文对应
const CommentTypeMap = {
  [CommentType.COMMENT]: "评论",
  [CommentType.MESSAGE]: "留言",
};

// 使用函数来获取对应的中文说明
export function getCommentTypeLabel(type) {
  return CommentTypeMap[type] || "未知类型";
}


// 定义枚举类型 (在 JavaScript 中使用对象来代替 TypeScript 枚举)
const CommentStatus = {
  APPLYING: "APPLYING", // 审批中
  NORMAL: "NORMAL",     // 正常
  REJECT: "REJECT",     // 审批拒绝
  DELETE: "DELETE",     // 删除
};

// 创建一个映射对象，将枚举值与中文对应
const CommentStatusMap = {
  [CommentStatus.APPLYING]: "审批中",
  [CommentStatus.NORMAL]: "正常",
  [CommentStatus.REJECT]: "审批拒绝",
  [CommentStatus.DELETE]: "删除",
};

// 使用函数来获取对应的中文说明
export function getCommentStatusLabel(status) {
  return CommentStatusMap[status] || "未知状态";
}
