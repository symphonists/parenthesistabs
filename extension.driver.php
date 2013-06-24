<?php

	Class extension_parenthesistabs extends Extension{

		public function getSubscribedDelegates(){
			return array(
				array(
					'page'		=> '/backend/',
					'delegate'	=> 'InitaliseAdminPageHead',
					'callback'	=> 'initaliseAdminPageHead'
				)
			);
		}

 		public function InitaliseAdminPageHead($context) {
			$callback = Administration::instance()->getPageCallback();

			if(in_array($callback['context']['page'], array('new', 'edit'))) {
				Administration::instance()->Page->addScriptToHead(URL . '/extensions/parenthesistabs/assets/parenthesistabs.publish.js', 100, false);
			}
		}

	}
