package org.fundacionjala.contacts;

import org.fundacionjala.contacts.controllers.ContactController;
import org.fundacionjala.contacts.controllers.MessageController;
import org.fundacionjala.contacts.controllers.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ContactsApplicationTests {

	@Autowired
	private UserController userController;
	@Autowired
	private ContactController contactController;
	@Autowired
	private MessageController messageController;

	@Test
	public void contextLoads() {
		assertThat(userController).isNotNull();
		assertThat(contactController).isNotNull();
		assertThat(messageController).isNotNull();
	}

}
