
---
title: DvaJS的学习笔记
date: 2018-12-27 15:33:49
tags: 学轮子
---
#DVA踩坑

错误写法：

    	@connect(( state ) => ({ 
    		demo: state.model
    }))

正确写法：

    @connect(( { classifyList }) => { 
    	const { list, country, desc, status, listStatus, hasItem } = classifyList;
    	return {
    			list,
    			country,
    			desc,
    			status,
    			listStatus,
    			hasItem
    	}
    })