import { GraphQLResolveInfo } from 'graphql';
import { Transaction } from 'sequelize';

import { CommentInstance } from './../../../models/CommentModel';
import { DbConnection } from './../../../interfaces/DbConnectionInterface';
import { handleError } from './../../../utils/utils';

export const commentResolvers = {
  Comment: {
    user: (
      comment,
      params,
      { db }: { db: DbConnection },
      info: GraphQLResolveInfo
    ) => {
      return db.User.findById(comment.get('user')).catch(handleError);
    },
    post: (
      comment,
      params,
      { db }: { db: DbConnection },
      info: GraphQLResolveInfo
    ) => {
      return db.User.findById(comment.get('post')).catch(handleError);
    }
  },
  Query: {
    commentsByPost: (
      parent,
      { id, first = 10, offset = 0 },
      { db }: { db: DbConnection },
      info: GraphQLResolveInfo
    ) => {
      id = parseInt(id);
      return db.Comment.findAll({
        where: { post: id },
        limit: first,
        offset: offset
      }).catch(handleError);
    }
  },
  Mutation: {
    createComment: (
      parent,
      { input },
      { db }: { db: DbConnection },
      info: GraphQLResolveInfo
    ) => {
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Comment.create(input, { transaction: t });
        })
        .catch(handleError);
    },
    updateComment: (
      parent,
      { id, input },
      { db }: { db: DbConnection },
      info: GraphQLResolveInfo
    ) => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Comment.findById(id).then((comment: CommentInstance) => {
            if (!comment) {
              throw new Error(`Comment with ${id} not found`);
            }
            return comment.update(input, { transaction: t });
          });
        })
        .catch(handleError);
    },
    deleteComment: (
      parent,
      { id },
      { db }: { db: DbConnection },
      info: GraphQLResolveInfo
    ) => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Comment.findById(id).then((comment: CommentInstance) => {
            if (!comment) {
              throw new Error(`Comment with ${id} not found`);
            }
            return comment
              .destroy({ transaction: t })
              .then(comment => !!comment);
          });
        })
        .catch(handleError);
    }
  }
};
