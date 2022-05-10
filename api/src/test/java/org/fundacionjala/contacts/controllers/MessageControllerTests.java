package org.fundacionjala.contacts.controllers;

import org.fundacionjala.contacts.JsonSerializerHelper;
import org.fundacionjala.contacts.models.Message;
import org.fundacionjala.contacts.services.MessageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class MessageControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MessageService service;

    @Test
    public void shouldReturnOkStatusWhenRetrievingAllMessage() throws Exception {
        mockMvc.perform(get("/messages"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void shouldReturnOkStatusWhenSavingMessage() throws Exception {

        Message message = new Message(null, 1L, "Message Content", Collections.singleton(1L));
        Message expectedMessage = new Message(1L, 1L, "Message Content", Collections.singleton(1L));

        when(service.saveMessage(any(Message.class)))
                .thenReturn(expectedMessage);

        mockMvc.perform(
                post("/messages")
                    .contentType("application/json")
                    .content(JsonSerializerHelper.toJson(message)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void shouldReturnBadRequestWhenMessageIsEmpty() throws Exception {
        Message message = new Message(null, 1L, null, Collections.singleton(1L));

        mockMvc.perform(
                        post("/messages")
                                .contentType("application/json")
                                .content(JsonSerializerHelper.toJson(message)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(
                        r -> assertThat(r.getResolvedException().getMessage())
                                .contains("Content of the message is required"));
    }

    @Test
    public void shouldReturnBadRequestWhenContactListIsEmpty() throws Exception {
        Message message = new Message(null, 1L, "My message", Collections.emptySet());

        mockMvc.perform(
                        post("/messages")
                                .contentType("application/json")
                                .content(JsonSerializerHelper.toJson(message)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(
                        r -> assertThat(r.getResolvedException().getMessage())
                                .contains("At least one contact should be added to the message"));
    }

}
